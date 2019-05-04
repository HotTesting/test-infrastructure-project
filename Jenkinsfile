pipeline {
  agent {
    docker {
      image 'node:10.15.3-jessie'
      args '--net=e2e-network'
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
            sh 'docker run --name todo-app -p 8080:80 --rm -d --net=e2e-network example:todo-app'
        }
      }
    }
    stage('Start Chrome') {
      steps {        
        sh "docker run --name temporary-chrome -p 4844:4444 --rm -d --net=e2e-network --shm-size=2g selenium/standalone-chrome:3.141.59-neon"
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