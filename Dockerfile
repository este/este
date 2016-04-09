# https://github.com/mhart/alpine-node
FROM mhart/alpine-node:5.10.1

ENV DIR=/opt/este PORT=8000 NODE_ENV=production

COPY package.json ${DIR}/

# Installs (and removes) python and build deps for source builds, ex. node-sass.
# Removing in the same instruction reduces image size bloat.
RUN apk add --update python python-dev build-base && \
  echo "# SUPPRESS WARNING" > ${DIR}/README.md && \
  cd ${DIR} && npm install && \
  apk del python python-dev build-base && \
  rm -rf /etc/ssl /usr/share/man /tmp/* /var/cache/apk/* /root/.npm /root/.node-gyp

COPY . $DIR

WORKDIR $DIR

RUN npm run build -- -p

EXPOSE $PORT

ENTRYPOINT ["npm"]

CMD ["start"]
