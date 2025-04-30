[![CI](https://github.com/Thomasgsn/projet/actions/workflows/ci.yml/badge.svg)](https://github.com/Thomasgsn/projet/actions)

# Installation
```
git clone https://github.com/Thomasgsn/projet.git
```
puis
```
docker-compose up --build
```

# 🚀 Task Manager App

## 📋 Présentation

Task Manager est une application web simple qui permet de :

- Ajouter des tâches
- Voir la liste des tâches
- Marquer une tâche comme terminée
- Supprimer une tâche

---

## ⚙️ Technologies utilisées

- **Frontend** : React + Vite
- **Backend** : Express.js (Node.js)
- **Base de données** : PostgreSQL
- **Conteneurisation** : Docker, Docker Compose
- **Orchestration** : Kubernetes (avec Ingress, Services, Deployments)
- **CI/CD** : GitHub Actions

---

## 🚀 Lancement avec Docker Compose

```bash
docker-compose up --build
```

Une fois tout lancé :

🌐 Frontend React : http://localhost

🔌 API Backend : http://localhost:3000/tasks

## 📦 Structure du projet

```
task-manager-app/
├── backend/
│   ├── Dockerfile
│   ├── app.js
│   ├── routes/
│       └── tasks.js
├── frontend/
│   ├── Dockerfile
│   ├── src/
│       └── App.jsx
├── db/
│   └── init.sql
├── k8s/
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── db-deployment.yaml
│   ├── db-pvc.yaml
│   ├── ingress.yaml
│   ├── secret.yaml
├── docker-compose.yml
├── README.md
└── .github/
    └── workflows/
        └── ci.yml
```

## TEST


#### k8s
```
kind create cluster --name devops-project
```
```
kubectl apply -f k8s/
```
```
kubectl get pods
kubectl get services
kubectl get ingress
```
