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
    stage('Build Frontend Container') {
      steps {
        sh '''
        npm run docker-build'''
      }
    }
    
    stage('Start Frontend') {
      steps {
        sh '''cd frontend
        npm run docker-start'''
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