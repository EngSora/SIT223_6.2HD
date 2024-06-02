pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'echo Building the application...'
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'echo Running tests...'
                bat 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                bat 'echo Deploying the application...'
                bat 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }
}
