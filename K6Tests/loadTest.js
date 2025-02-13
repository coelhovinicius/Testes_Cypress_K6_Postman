import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // 100 usuários simultâneos em 30 segundos
  ],
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/users');
  check(res, {
    'Status 200': (r) => r.status === 200,
    'Tempo de resposta menor que 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
