pipeline {
	agent any
	stages {
		stage ("pull code from bitbucket repo"){
			steps{
                git branch: 'main', credentialsId: 'jenkins', url: 'git@github.com:Rahuljat17/assignment.git'
			}
		}
		stage('Remove Old Containers and Images') {
            steps {
                script {
                    sh '''
                    sudo docker stop manhwa-app || true
                    sudo docker rm manhwa-app || true
                    '''
                    sh '''
                    sudo docker rmi rahul9664/manhwa-app:latest || true
                    '''
                }
            }
        }

		stage ("Building docker image"){
			steps{
				sh 'sudo docker build -t rahul9664/manhwa-app:latest .'
			}
		}
		stage ("Push on Docker-Hub"){
			steps{
				withCredentials([string(credentialsId: 'docker_hub', variable: 'docker_passwd')]) {
    					sh 'sudo docker login -u rahul9664 -p ${docker_passwd}'
					sh 'sudo docker push rahul9664/manhwa-app'
				}
			}
		}
		stage ("Testing the Build"){
			steps{
				sh 'sudo docker run -dit --name manhwa-app -p 3000:3000 rahul9664/manhwa-app:latest'
			}
		}
	}
}
