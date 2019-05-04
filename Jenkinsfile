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
            sh 'docker build --no-cache -t example:todo-app ./'
        }
      }
    }
    stage('Start Frontend container') {
      steps {
          dir("frontend") {
            sh 'docker run --name todo-app --rm -d --network e2e-network example:todo-app'
        }
      }
    }
    stage('Start Chrome') {
      steps {        
        sh "docker run --name temporary-chrome --rm -d --network e2e-network --shm-size=2g selenium/standalone-chrome:3.141.59-neon"
        sh 'sleep 10'
      }
    }
    stage('Start E2E tests') {
      steps {
        dir("e2e") {
            sh 'docker build --no-cache -t example:todo-app-e2e ./'
            sh 'docker run --name todo-app-e2e --rm --network e2e-network example:todo-app-e2e'
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