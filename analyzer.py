import os
import re
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st
from io import StringIO

# Функция для парсинга одного файла
def parse_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read()

    # Список вопросов и их результатов
    questions = []
    correct_answers = []
    user_answers = []
    results = []

    question_pattern = r"Вопрос (\d+):\s*Ваш ответ:\s*(.*?)\s*Правильный ответ:\s*(.*?)\s*Результат:\s*(.*?)\n"
    matches = re.findall(question_pattern, data)

    for match in matches:
        question_number = int(match[0])
        user_answer = match[1].strip()
        correct_answer = match[2].strip()
        result = match[3].strip()

        questions.append(question_number)
        user_answers.append(user_answer)
        correct_answers.append(correct_answer)
        results.append(result == 'Верно')

    return questions, user_answers, correct_answers, results


# Парсим все файлы в директории
def parse_all_files(uploaded_files):
    all_questions = []
    all_user_answers = []
    all_correct_answers = []
    all_results = []

    for uploaded_file in uploaded_files:
        # Временное сохранение загруженных файлов
        with open(uploaded_file.name, "wb") as f:
            f.write(uploaded_file.getbuffer())
        file_path = uploaded_file.name
        questions, user_answers, correct_answers, results = parse_file(file_path)
        all_questions.extend(questions)
        all_user_answers.extend(user_answers)
        all_correct_answers.extend(correct_answers)
        all_results.extend(results)

    return all_questions, all_user_answers, all_correct_answers, all_results


# Функция для создания статистики
def generate_statistics(all_questions, all_user_answers, all_correct_answers, all_results):
    # Преобразуем данные в pandas DataFrame
    df = pd.DataFrame({
        'Question': all_questions,
        'User Answer': all_user_answers,
        'Correct Answer': all_correct_answers,
        'Correct': all_results
    })

    # Статистика по количеству правильных и неправильных ответов
    correct_stats = df.groupby('Question')['Correct'].value_counts().unstack().fillna(0)

    # Количество верных/неверных ответов по каждому вопросу
    correct_stats.columns = ['Incorrect', 'Correct']

    return df, correct_stats


# Функция для анализа результатов
def analyze_results(df):
    analysis = []
    total_questions = len(df)
    correct_count = df['Correct'].sum()
    incorrect_count = total_questions - correct_count

    analysis.append(f"Всего вопросов: {total_questions}")
    analysis.append(f"Правильных ответов: {correct_count} ({correct_count / total_questions * 100:.1f}%)")
    analysis.append(f"Неправильных ответов: {incorrect_count} ({incorrect_count / total_questions * 100:.1f}%)")

    # Анализ по сложным вопросам
    question_errors = df.groupby('Question')['Correct'].apply(lambda x: len(x) - x.sum())
    hardest_question = question_errors.idxmax()
    analysis.append(f"Самый сложный вопрос: №{hardest_question} с {question_errors.max()} ошибками.")

    return "\n".join(analysis)


# Функция для создания и отображения различных диаграмм с Plotly
def plot_statistics(correct_stats, df):
    # 1. График количества правильных и неправильных ответов по вопросам
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=correct_stats.index,
        y=correct_stats['Correct'],
        name='Верно',
        marker_color='#66FF66'
    ))
    fig.add_trace(go.Bar(
        x=correct_stats.index,
        y=correct_stats['Incorrect'],
        name='Неверно',
        marker_color='#FF6666'
    ))
    fig.update_layout(
        title='Правильные и Неправильные Ответы по Вопросам',
        xaxis_title='Номер вопроса',
        yaxis_title='Количество ответов',
        barmode='stack',
        template='plotly_dark',
        height=500
    )
    st.plotly_chart(fig)

    # 2. Гистограмма распределения правильных и неправильных ответов среди всех пользователей
    correct_counts = df['Correct'].value_counts()
    fig = px.bar(
        x=['Неверно', 'Верно'],
        y=correct_counts,
        color=['Неверно', 'Верно'],
        color_discrete_map={'Неверно': '#FF6666', 'Верно': '#66FF66'},
        labels={'x': 'Ответ', 'y': 'Количество пользователей'},
        title='Распределение Правильных и Неправильных Ответов',
        template='plotly_dark'
    )
    st.plotly_chart(fig)

    # 3. Тепловая карта для анализа ошибок по каждому вопросу
    error_matrix = df.groupby(['Question', 'Correct']).size().unstack(fill_value=0)
    fig = go.Figure(data=go.Heatmap(
        z=error_matrix.values,
        x=error_matrix.columns,
        y=error_matrix.index,
        colorscale='Viridis',
        colorbar=dict(title="Количество ошибок")
    ))
    fig.update_layout(
        title='Тепловая Карта Ошибок по Вопросам',
        xaxis_title='Правильность ответа',
        yaxis_title='Номер вопроса',
        template='plotly_dark',
        height=500
    )
    st.plotly_chart(fig)


# Основной код
def main():
    # Заголовок
    st.title("Анализ Результатов Теста")

    # Загрузка файлов
    uploaded_files = st.file_uploader("Загрузите файлы с результатами теста", accept_multiple_files=True)

    if uploaded_files:
        # Парсим все файлы
        all_questions, all_user_answers, all_correct_answers, all_results = parse_all_files(uploaded_files)

        # Генерация статистики
        df, correct_stats = generate_statistics(all_questions, all_user_answers, all_correct_answers, all_results)

        # Вывод статистики
        st.subheader("Статистика по верным/неверным ответам:")
        st.dataframe(correct_stats)

        # Анализ результатов
        st.subheader("Анализ результатов:")
        analysis = analyze_results(df)
        st.text(analysis)

        # Кнопка для скачивания анализа
        st.download_button(
            label="Скачать результат анализа",
            data=analysis,
            file_name="analysis.txt",
            mime="text/plain"
        )

        # Построение графиков
        plot_statistics(correct_stats, df)


if __name__ == "__main__":
    main()
