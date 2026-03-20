# **SISTEMA DE AGENDAMENTO MÉDICO**



**Descrição**



Este projeto consiste em uma aplicação web completa para gerenciamento de agendamentos médicos, permitindo que usuários realizem cadastro, login e agendem consultas de forma simples e eficiente.



O sistema foi desenvolvido com separação entre frontend e backend, seguindo boas práticas de desenvolvimento web.





## **Objetivo**



Facilitar o agendamento de consultas médicas, oferecendo uma interface intuitiva e integração com serviços externos como CEP e clima.





## **Funcionalidades**



* Cadastro de usuários
* Login com autenticação JWT
* Criação de agendamentos
* Visualização de consultas no dashboard
* Cancelamento de consultas
* Conclusão de consultas
* Exibição de clima da cidade
* Busca automática de endereço por CEP
* Status da consulta (Agendado, Concluído, Cancelado)





## **Tecnologias Utilizadas**



* Frontend
* Vue.js
* Vite
* CSS
* Backend
* Node.js
* Express
* MongoDB
* Mongoose
* JWT (Autenticação)
* APIs externas
* ViaCEP (endereço)
* WTTR.in (clima)



## **Estrutura do Projeto**



sistema-agendamento-medico/

│

├── backend/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   └── server.js

│

├── frontend/

│   ├── src/

│   ├── views/

│   └── services/







## **Como rodar o projeto**

Backend

* cd backend
* npm install
* npm run dev


ou:


* node server.js



### **Crie um arquivo .env:**



PORT=4000

MONGO\_URI=SEU\_MONGO\_AQUI

JWT\_SECRET=sua\_chave\_secreta

Frontend

* cd frontend
* npm install
* npm run dev



## **Acesse:**

https://sistema-agendamento-m-dico.vercel.app/

Autenticação



O sistema utiliza JSON Web Token (JWT) para proteger rotas privadas.

Após o login, o token é armazenado e enviado nas requisições para autenticação do usuário.





## **Demonstração do Sistema**



* Login
* Sistema de autenticação de usuários.
* Cadastro
* Criação de novos usuários.
* Agendamento





## **Cadastro de consultas com:**



* Data
* Hora
* Médico
* CEP (busca automática)





## **Dashboard**



Exibe:



* Paciente
* Data
* Endereço
* Clima
* Status





## **Ações disponíveis:**



* Concluir consulta
* Cancelar consulta







## **Integrações**



* ViaCEP: busca automática de endereço
* WTTR.in: exibição do clima da cidade





# **Autor**



Desenvolvido por: Vando Costa

Curso: Análise e Desenvolvimento de Sistemas







## 

