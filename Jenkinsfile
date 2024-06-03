pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_PROJECT_KEY = 'blog-platform'
        SONARQUBE_GLOBAL_TOKEN = credentials('sonarqube_global_token')
        NEW_RELIC_LICENSE_KEY = 'NRAK-L07EBEGPZXGH6PQTB6AWDG5UXRO'
        // Path to the directory containing the sonar-scanner executable
        SONAR_SCANNER_HOME = 'C:\\Users\\MyDev\\Downloads\\sonar-scanner-cli-5.0.1.3006-windows\\sonar-scanner-5.0.1.3006-windows\\bin'
    }

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
        stage('Code Quality Analysis') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            export PATH=$PATH:$SONAR_SCANNER_HOME
                            sonar-scanner \
                            -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=$SONARQUBE_URL \
                            -Dsonar.login=$SONARQUBE_GLOBAL_TOKEN
                        '''
                    } else {
                        bat '''
                            set PATH=%PATH%;%SONAR_SCANNER_HOME%
                            sonar-scanner ^
                            -Dsonar.projectKey=%SONARQUBE_PROJECT_KEY% ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=%SONARQUBE_URL% ^
                            -Dsonar.login=%SONARQUBE_GLOBAL_TOKEN%
                        '''
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
        stage('Release') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Releasing the application...'
                        sh 'docker push blogplatformpipeline:latest'
                    } else {
                        bat 'echo Releasing the application...'
                        bat 'docker push blogplatformpipeline:latest'
                    }
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Setting up New Relic monitoring...'
                        sh 'npm install newrelic'
                        sh 'echo New Relic setup complete.'
                    } else {
                        bat 'echo Setting up New Relic monitoring...'
                        bat 'npm install newrelic'
                        bat 'echo New Relic setup complete.'
                    }
                }
            }
        }
    }
}
