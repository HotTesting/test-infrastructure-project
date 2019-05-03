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
    stage('Start Chrome') {
      steps {        
        sh "docker run --rm -d -p 4844:4444 --name temporary-chrome --shm-size=2g selenium/standalone-chrome:3.141.59-neon"
      }
    }
    stage('E2E tests') {
      steps {
        sh '''cd ../e2e
        npm test'''
      }
    }
  }
  post {
    always {
      sh '''docker rm -vf todo-app'''
      sh '''docker rm -vf temporary-chrome'''
    }   
  }
}