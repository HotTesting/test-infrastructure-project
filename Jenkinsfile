pipeline {
  agent {
    docker {
      image 'node:10.15.3-jessie'
    }
  }
  stages {
    stage('Build Frontend container') {
      steps {
        dir("frontend") {
            sh 'pwd'
            sh 'npm install'
            sh 'npm run docker-stop'
            sh 'npm run docker-build'
        }
      }
    }
    stage('Start Frontend container') {
      steps {
        sh 'npm run docker-run'
      }
    }
    stage('E2E tests - run') {
      steps {
        dir("frontend") {
            sh 'pwd'
            sh 'npm install'
            sh 'npm test'
        }
      }
    }
  }
  post {
    always {
        sh '''
        cd frontend
        npm run docker-stop'''
    }
  }
}