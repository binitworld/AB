pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/binitworld/Banking-system-Architecture-.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }
    
    post {
        always {
            // Clean up any resources if needed
        }
        
        success {
            echo 'Build succeeded! Deploying...'
        }
        
        failure {
            echo 'Build failed! Check the logs for details.'
        }
    }
}
