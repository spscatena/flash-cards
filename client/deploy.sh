git add . &&
git commit -m "deploy" &&
git push origin master && 
npm run build && cd build && 
mv index.html 200.html && 
npx surge --domain http://flash-cards-ss.surge.sh

# to run this, in terminal (in the client dir) sh deploy.sh