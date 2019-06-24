BUILD_DIRECTORY="JsBotBuild"
DATE=`date '+%Y-%m-%d %H:%M'`

ENVIRONMENT=${1:-'STAGING'}

DEMOURL="https://git.heroku.com/js-bot-demo.git"
STAGINGURL="https://git.heroku.com/js-bot-staging.git"

RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NO_COLOR='\033[0m'

warn(){
  echo "⚠️  ${YELLOW}$1${NO_COLOR}"
  exit 1
}

success(){
  echo "✅  ${GREEN}$1${NO_COLOR}"
}

if [[ ( "$ENVIRONMENT" != "STAGING" && "$ENVIRONMENT" != "DEMO" ) ]]
then
  warn "Wrong destination enviroment, set STAGING or DEMO"
elif [[ ( "$ENVIRONMENT" = "DEMO" ) ]]
then
  ORIGIN=$DEMOURL
else
  ORIGIN=$STAGINGURL
fi

CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
if [ "$CURRENT_BRANCH" != "master" ]
then
  warn "Wrong branch, checkout master to deploy."
else
  success "Deploying to heroku for $ENVIRONMENT"
fi

rm -rf $BUILD_DIRECTORY
mkdir $BUILD_DIRECTORY
cp TSApi/package.json $BUILD_DIRECTORY/package.json
cp TSApi/package-lock.json $BUILD_DIRECTORY/package-lock.json

cd TSApi
npm run build
cp -R TSApi/dist $BUILD_DIRECTORY/

cd $BUILD_DIRECTORY
git init
git remote add origin $ORIGIN
git checkout -b master
git add .
git commit -m "Deploy ${DATE}"
git push -f

rm -rf $BUILD_DIRECTORY
