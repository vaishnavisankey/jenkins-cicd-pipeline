pipeline {
    agent any

    parameters {
        string(name: 'DEPLOY_VERSION', defaultValue: 'v1.0.0', description: 'Deployment version')
        choice(name: 'BRANCH_NAME', choices: ['main', 'dev', 'staging'], description: 'Git branch to deploy')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
    }

    environment {
    SSH_USER = 'ubuntu'                      
    SSH_HOST = '114.143.107.6'              // 
    SSH_CRED_ID = 'ssh-deploy-key'     
    DEPLOY_DIR = '/home/ubuntu/app-folder'   
    BACKUP_DIR = '/home/ubuntu/backup-folder'
    REPO_URL = 'https://github.com/vaishnavisankey/jenkins-cicd-pipeline.git'
}

    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: "${env.REPO_URL}"
            }
        }

        stage('Backup Current Version') {
            steps {
                sshagent(credentials: [env.SSH_CRED_ID]) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST '
                        mkdir -p $BACKUP_DIR &&
                        cp -r $DEPLOY_DIR $BACKUP_DIR/deploy_${DEPLOY_VERSION}_bak || true
                    '
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: [env.SSH_CRED_ID]) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST '
                        rm -rf $DEPLOY_DIR &&
                        mkdir -p $DEPLOY_DIR &&
                        git clone -b ${BRANCH_NAME} $REPO_URL $DEPLOY_DIR &&
                        cd $DEPLOY_DIR &&
                        npm install &&
                        npm run build
                    '
                    '''
                }
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed! Rolling back...'
            sshagent(credentials: [env.SSH_CRED_ID]) {
                sh '''
                ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST '
                    rm -rf $DEPLOY_DIR &&
                    cp -r $BACKUP_DIR/deploy_${DEPLOY_VERSION}_bak $DEPLOY_DIR
                '
                '''
            }
        }
        success {
            echo 'Deployment successful.'
        }
    }
}
