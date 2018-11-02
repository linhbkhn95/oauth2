echo "Killing existing instance....."
#Kill first
kill -9 `cat server.pid`
echo "Killed process $(cat server.pid)"
#Increase open files
ulimit -n 10032
#Start server
echo "Starting.........."
sails lift >> server.log &
echo $! > server.pid
echo "Started!!!!!!!!! pid=$(cat server.pid)"
