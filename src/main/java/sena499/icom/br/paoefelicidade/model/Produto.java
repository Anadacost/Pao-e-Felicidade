package sena499.icom.br.paoefelicidade.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public class Produto {





    @Entity
    @Table(name = "PRODUTO")
    public class Produto {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "ID")
        private Long id;

        @Column(name = "CODIGO")
        private Integer codigo;

        @Column(name = "PRODUTO", length = 30)
        private String produto;

        @Column(name = "DESCRICAO", columnDefinition = "MEDIUMTEXT")
        private String descricao;

        @Column(name = "VALOR", precision = 10, scale = 2)
        private BigDecimal valor;

        @Column(name = "DATACADASTRO")
        private LocalDateTime dataCadastro;

        @Column(name = "ATIVO")
        private Boolean ativo;

        // CONSTRUTOR VAZIO
        public Produto() {
        }

        // CONSTRUTOR COMPLETO
        public Produto(Long id, Integer codigo, String produto,
                       String descricao, BigDecimal valor,
                       LocalDateTime dataCadastro, Boolean ativo) {

            this.id = id;
            this.codigo = codigo;
            this.produto = produto;
            this.descricao = descricao;
            this.valor = valor;
            this.dataCadastro = dataCadastro;
            this.ativo = ativo;
        }

        // GETTERS E SETTERS

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Integer getCodigo() {
            return codigo;
        }

        public void setCodigo(Integer codigo) {
            this.codigo = codigo;
        }

        public String getProduto() {
            return produto;
        }

        public void setProduto(String produto) {
            this.produto = produto;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public BigDecimal getValor() {
            return valor;
        }

        public void setValor(BigDecimal valor) {
            this.valor = valor;
        }

        public LocalDateTime getDataCadastro() {
            return dataCadastro;
        }

        public void setDataCadastro(LocalDateTime dataCadastro) {
            this.dataCadastro = dataCadastro;
        }

        public Boolean getAtivo() {
            return ativo;
        }

        public void setAtivo(Boolean ativo) {
            this.ativo = ativo;
        }
    }

}
