To get you started you can simply clone the `Weather-APP` repository and install the dependencies:

1)clone zip archive from  repository: https://github.com/anton1gritsenko/weather-app
2)on project directory use terminal (PHPstorm)
3)use command install npm: 'npm install'
4)use command install bower components: 'bower install'

```
Behind the scenes this will also call `bower install`. After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
`weather` changes this location through the `.bowerrc` file. Putting it in the `app` folder
makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. You should to install the [npm live-server][live-server] 

```
live-server
and starting app Weather-APP
5)use command 'npm start'
#### Allow-Control-Allow-Origin

The app uses http request for access to files from the server. For correct access you should to allow access control original.
The easier way is install extension for your browser.



