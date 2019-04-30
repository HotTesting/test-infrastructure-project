pipeline {
  agent {
    docker {
      image 'node:10.15.3-jessie'
    }
  }
  stages {
    stage('Build Frontend') {
      steps {
        sh '''cd frontend
        npm install'''
      }
    }
    stage('Start Frontend') {
      steps {
        sh '''cd frontend
        npm start'''
      }
    }
    stage('E2E tests') {
      steps {
        sh '''cd ../e2e
        npm test'''
      }
    }
    stage('Stop env') {
      steps {
        sh '''cd ../frontend
        npm run docker-stop'''
      }
    }
  }
}