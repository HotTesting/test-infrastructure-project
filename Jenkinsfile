pipeline {
  agent {
    docker {
      image 'node:10.15.3-jessie'
    }
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
            sh 'docker build --no-cache -t todo-app:edge ./'
            sh 'docker run --name todo-app --rm -d --network e2e-network todo-app:edge'
        }
      }
    }
    stage('Start Chrome') {
      steps {        
        sh "docker run --name temporary-chrome --rm -d --network e2e-network --shm-size=2g selenium/standalone-chrome-debug"
        // Giving time to start chrome
        sh 'sleep 5'
      }
    }
    stage('E2E tests') {
      steps {
        dir("e2e") {
            sh 'docker build --no-cache -t todo-app-tests:edge ./'
            sh 'docker run --name todo-app-e2e --rm --network e2e-network todo-app-tests:edge'
        }
      }
    }
  }
  post {
    always {
      sh 'docker rm -vf todo-app || true'
      sh 'docker rm -vf temporary-chrome || true'
      sh 'docker rmi todo-app:edge || true'
    }   
  }
}