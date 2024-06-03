pipeline {
    agent any

    environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_PROJECT_KEY = 'blog-platform'
        SONARQUBE_GLOBAL_TOKEN = credentials('sonarqube_global_token')
        NEW_RELIC_LICENSE_KEY = 'NRAK-L07EBEGPZXGH6PQTB6AWDG5UXRO'
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
                            sonar-scanner \
                            -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=$SONARQUBE_URL \
                            -Dsonar.login=$SONARQUBE_GLOBAL_TOKEN
                        '''
                    } else {
                        bat '''
                            sonar-scanner \
                            -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=$SONARQUBE_URL \
                            -Dsonar.login=$SONARQUBE_GLOBAL_TOKEN
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
                        sh 'npm install -g newrelic'
                        sh 'newrelic install --licenseKey=$NEW_RELIC_LICENSE_KEY --app_name="Blog Platform"'
                    } else {
                        bat 'echo Setting up New Relic monitoring...'
                        bat 'npm install -g newrelic'
                        bat 'newrelic install --licenseKey=$NEW_RELIC_LICENSE_KEY --app_name="Blog Platform"'
                    }
                }
            }
        }
    }
}
