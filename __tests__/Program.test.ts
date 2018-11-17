import { Gates, Program } from '../src';

test('one gate program', () => {
  let xgate = Gates.X(1);
  let p = new Program();
  p.add(xgate);
  expect(p.code('quil')).toBe('X 1');
});

test('one gate then measure program', () => {
  let xgate = Gates.X(1);
  let p = new Program();
  p.add(xgate);
  p.measure(1, 2);

  expect(p.code('quil')).toBe('X 1\nMEASURE 1 ro[2]');
  expect(p.code('q#')).toBe('X(1);\nlet reg2 = M(1);')
  expect(p.code('qasm')).toBe('OPENQASM 2.0;include "qelib1.inc";qreg q[1];creg c[2];\nx q[1];\nmeasure q[1] -> c[2];');
});