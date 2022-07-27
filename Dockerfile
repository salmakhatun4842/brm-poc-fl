FROM alpine:3.8
RUN apk update
RUN apk add nodejs
#FROM 688655293652.dkr.ecr.ap-south-1.amazonaws.com/base-image
ENV PORT=80
EXPOSE $PORT
COPY app.js /app/
CMD ["node", "/app/app.js"]
