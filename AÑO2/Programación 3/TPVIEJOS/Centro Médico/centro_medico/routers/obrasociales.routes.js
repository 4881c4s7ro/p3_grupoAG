import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {
  res.send('GET obras sociales');
});


router.get('/:id', (req, res) => {
  res.send(`GET obra social ${req.params.id}`);
});


router.post('/', (req, res) => {
  res.send('POST obra social');
});


router.put('/:id', (req, res) => {
  res.send(`PUT obra social ${req.params.id}`);
});


router.delete('/:id', (req, res) => {
  res.send(`DELETE obra social ${req.params.id}`);
});

export default router;