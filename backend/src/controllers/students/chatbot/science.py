from flask import request
from ....db.connection import db
from ....utils.ApiResponse import ApiResponse
from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings.cohere import CohereEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferWindowMemory
import PyPDF2
import os

text = ""
with open(f"docs/science.pdf", "rb") as f:
    reader = PyPDF2.PdfReader(f)
    for page_num in range(len(reader.pages)):  # type: ignore
        page = reader.pages[page_num]
        text += page.extract_text()
    text_splitter = RecursiveCharacterTextSplitter(separators=["\n\n"],
                                                chunk_size=1000, chunk_overlap=20, length_function=len)
print(text[:10])
chunks = text_splitter.split_text(text)
vector_store = FAISS.from_texts(texts=chunks, embedding=CohereEmbeddings(
    cohere_api_key=os.environ["COHERE_API_KEY"]))  # type: ignore
retriever = vector_store.as_retriever()
# print(retriever.get_relevant_documents(query=question))
llm = ChatGoogleGenerativeAI(model="gemini-pro")
conversation_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=ConversationBufferWindowMemory(
        k=5, memory_key="chat_history", return_messages=True, return_docs=False)  # type: ignore
)


def science_chatbot():
    question = request.get_json()["question"]
    answer = conversation_chain({"question": question})
    return ApiResponse(200, answer["answer"]).json
