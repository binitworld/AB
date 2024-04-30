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
                sh 'npm install' // Install project dependencies
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test' // Run tests
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm run deploy' // Deploy the application
            }
        }
        
        stage('StartingPage') {
            steps {
                sh 'npm install' // Install dependencies for starting page
                sh 'npm run build' // Build assets for starting page
                sh 'node server.js &' // Start backend server for starting page
            }
        }
        
        stage('MainPage') {
    steps {
        sh 'rsync -avz ./dist/ user@server:/var/www/html/' // Deploy frontend files for main page
        
        // Additional steps to ensure navigation functions are working
        script {
            def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://your-server-address/", returnStdout: true).trim()
            if (response == '200') {
                echo 'Main page deployed successfully.'
            } else {
                error "Failed to deploy main page."
            }
        }
    }
}
        
        stage('TransferMoney') {
    steps {
        script {
            // Check database for successful payments
            def successfulPayments = checkForSuccessfulPayments()
            
            // If successful payments found, trigger Jenkins build
            if (successfulPayments) {
                echo 'Successful payments detected. Triggering Jenkins build...'
                triggerJenkinsBuild()
            } else {
                echo 'No successful payments detected. Skipping Jenkins build.'
            }
        }
    }
}

        stage('ViewTransactions') {
            steps {
                // Query database for transaction history
                // Render transaction data on a web page
                // Implement pagination or filtering options
            }
        }
        
        stage('Security') {
    steps {
        script {
            def submissionSuccessful = submitUserComplaint()
            
            // If submission successful, trigger Jenkins build
            if (submissionSuccessful) {
                echo 'Complaint submitted successfully. Triggering Jenkins build...'
                triggerJenkinsBuild()
            } else {
                error 'Failed to submit complaint. Jenkins build not triggered.'
            }
        }
    }
}

        stage('EmailNotification') {
            steps {
                emailext subject: 'Build Notification', body: 'The build is successful. You can view it at ${BUILD_URL}', to: 'contactbinitbhushan@gmail.com'
            }
        }
    }
    
    post {
        success {
            // Perform post-build steps, if any
            // Archive build artifacts for future reference
            // Clean up workspace to free up resources
        }
        
        failure {
            // Handle build failures, if any
            // Notify developers about the failure
            // Rollback changes if necessary to restore system stability
        }
    }
}
