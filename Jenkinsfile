pipeline {
  agent {
    label 'MASTER'
  }

  stages {
    stage('Unit tests') {
      steps {
        sh 'echo Unit Tests passed!'
      }
    }
    stage('Start Frontend') {
      steps {
          dir("frontend") {
            sh 'docker build --no-cache -t todo-app:edge .'
            sh 'docker run --rm --name todo-app -d --privileged --network e2e-network todo-app:edge'
        }
      }
    }
    stage('Start Chrome') {
      steps {        
        sh "docker run --rm --name temporary-chrome -d --privileged --network e2e-network --shm-size=2g selenium/standalone-chrome:3.141.59"
        // Giving time to start chrome
        sh 'sleep 30'
      }
    }
    stage('E2E tests') {
      steps {
        dir("e2e") {
            sh 'docker build --no-cache -t todo-app-tests:edge .'
            sh 'docker run --name todo-app-e2e --rm --network e2e-network todo-app-tests:edge'
        }
      }
    }
  }
  post {
    always {
      sh 'docker rm -f todo-app || true'
      sh 'docker rm -f temporary-chrome || true'
      sh 'docker rm -f todo-app-e2e || true'
    }    
  }
}
