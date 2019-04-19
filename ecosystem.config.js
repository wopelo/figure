module.exports = {
  apps : [{
    name: 'figure_pm2',
    script: 'prod.server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '123.207.156.15',
      key: '../ssh',
      ssh_options: 'StrictHostKeyChecking=no',
      ref  : 'origin/complete',
      repo : 'git@github.com:wopelo/figure.git',
      path : '~/node_work/figure_pm2',
      'post-deploy' : 'git pull && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
