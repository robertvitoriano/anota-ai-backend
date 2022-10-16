pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/robertvitoriano/anota-ai-backend', branch: 'master')
      }
    }

    stage('log file names') {
      steps {
        sh 'ls -la'
      }
    }

  }
}