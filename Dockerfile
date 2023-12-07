FROM denoland/deno:alpine-1.38.3

WORKDIR /app

COPY deps.ts .
RUN deno cache deps.ts 

COPY . .

RUN deno cache main.ts 
RUN deno task complie

# CMD ["task", "complie"]