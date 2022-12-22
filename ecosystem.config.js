// ecosytem.config.js : pm2 config

module.exports = {
    apps: [{
        name:           'app', 
        script:         '', 
        instance:       0, 
        exec_mode:      'cluster', 
        wait_ready:     true, 
        listen_timeout: 500
    }]
}