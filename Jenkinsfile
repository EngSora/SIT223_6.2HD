pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Building the application...'
                        sh 'npm install'
                    } else {
                        bat 'echo Building the application...'
                        bat 'npm install'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Running tests...'
                        sh 'npm test'
                    } else {
                        bat 'echo Running tests...'
                        bat 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Deploying the application...'
                        sh 'docker-compose -f docker-compose.yml up -d'
                    } else {
                        bat 'echo Deploying the application...'
                        bat 'docker-compose -f docker-compose.yml up -d'
                    }
                }
            }
        }
    }
}
