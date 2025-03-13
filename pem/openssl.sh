# 개인 키 생성
$ openssl genrsa -out private-key.pem 2048

# 개인 키를 사용한 새로운 인증서 요청서 생성
$ openssl req -new -key private-key.pem -out cert-request.csr

# 요청서를 사용한 자체 서명 인증서 생성
$ openssl x509 -req -in cert-request.csr -signkey private-key.pem -out cert.pem