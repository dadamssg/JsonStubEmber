

scp root@jsonstub.com:/var/lib/postgresql/jsonstub_prod_db.sql dadamssg@192.241.171.76:/home/dadamssg/scripts/jsonstub_data.sql

scp root@jsonstub.com:/var/lib/postgresql/jsonstub_prod_db.sql /Users/davidadams/Sites/VMs/JsonStubSymfonyProd/scripts/jsonstub_prod_db.sql

scp /Users/davidadams/Sites/VMs/JsonStubSymfonyProd/scripts/admin.jsonstub.conf dadamssg@192.241.171.76:/home/dadamssg/admin.jsonstub.conf

scp /Users/davidadams/Sites/VMs/JsonStubSymfonyProd/scripts/jsonstub_prod_db.sql dadamssg@192.241.171.76:/home/dadamssg/jsonstub_prod_db.sql


scp -r /Users/davidadams/Sites/VMs/JStubVM/jsonstub-ember/dist  deployer@192.241.171.76:/var/www/jsonstubfrontend/

scp -r /Users/davidadams/Sites/VMs/JStubVM/jsonstub-ember/dist  deployer@192.241.171.76:/var/www/jsonstubemberstaging/


app/console --env=test jsonstub:oauth-server:client:create --grant-type=password

192.241.171.76 - new 

208.68.37.151 - old

map $content_type $doc_root { 
    default /var/www/jsonstubember/dist;
    "application/json" /var/www/backend.jsonstub.com/current/web;
    "application/x-www-form-urlencoded" /var/www/backend.jsonstub.com/current/web;
}

rm -rf jsonstubember
ln -s /var/www/jsonstubfrontend /var/www/jsonstubember




map $content_type $doc_root {       
    default /var/www/backend.jsonstub.com/current/web;                                               
    "" /var/www/jsonstubember/dist;                         
    "text/html" /var/www/jsonstubember/dist; 
}
server {

   if ($request_method = 'OPTIONS') {                                                                                                                                                                                                 
       set $doc_root '/var/www/backend.jsonstub.com/current/web';                                                                                                                                                                                 
   } 

    default_type text/html;
    root $doc_root;
    server_name jsonstub.com;
    index index.html app.php; 

    access_log /var/log/nginx/jsonstub.com-access.log;
    error_log  /var/log/nginx/jsonstub.com-error.log error;

    charset utf-8;
    
#    rewrite ^/(.*)/$ /$1 permanent;
   
    location / {
try_files $uri /index.html?/$request_uri /index.html /app.php$is_args$args;    
}

    location ~ ^/(app|app_dev|app_test|config)\.php(/|$) {   

        try_files $fastcgi_script_name =404;

        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        # With php5-fpm:
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param APP_ENV local;
        fastcgi_param HTTPS off;
    }
    
    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    # Deny .htaccess file access
    location ~ /\.ht {
        deny all;
    }
}

y8A4MLLtCstd3t3

cstd3t3

