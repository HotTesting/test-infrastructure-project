pipeline {
  agent {
    node {
      label 'nodejs'
    }

  }
  stages {
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
  }
}