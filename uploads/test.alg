algoritmo "visual"
var
  n1, n2, o: inteiro
  r: real

inicio
  leia(n1)
  leia(n2)
  leia(o)

    se(o=1)entao
      r<-n1+n2
    senao
        se (o=2)entao
      r<-n1-n2
        senao
      r<-0
        fimse
    fimse

  escreva(r)

fimalgoritmo