# OneTimeFile (OTF)

OTF is a web server that allows download of a file just once. 

This allows for distribution of information with assurance that the file will only be accessible once, and the intended use case is easily revokable secrets. Should the intended recpient fail to retrieve the file before a third party, the recpient will be aware that third parties have acquired the file. 

The files once uploaded are stored in mongodb in base64 format and deleted once a successful download as occured: index:63

docker image available at: https://hub.docker.com/r/nannal/otf