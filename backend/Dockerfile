FROM python:3.8-slim-buster
RUN mkdir -p backend
WORKDIR /backend

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run"]