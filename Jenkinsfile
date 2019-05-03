pipeline {
  agent {
    docker {
      image 'node:10.15.3-jessie'
      args '--net=host'
    }
  }
  stages {
    stage('Build Frontend container') {
      steps {
        dir("frontend") {
            sh 'pwd'
            sh 'npm install'
            sh 'npm run docker-build'
        }
      }
    }
    stage('Start Frontend container') {
      steps {
          dir("frontend") {
            sh 'npm run docker-run'
        }
      }
    }
    stage('Start Chrome') {
      steps {        
        sh "docker run --rm -d -p 4844:4444 --name temporary-chrome --shm-size=2g selenium/standalone-chrome:3.141.59-neon"
      }
    }
    stage('Start E2E tests') {
      steps {
        dir("e2e") {
            sh 'pwd'
            sh 'npm install'
            sh 'npm test'
        }
      }
    }
  }
  post {
    always {
      sh '''docker rm -vf todo-app || true'''
      sh '''docker rm -vf temporary-chrome || true'''
    }   
  }
}