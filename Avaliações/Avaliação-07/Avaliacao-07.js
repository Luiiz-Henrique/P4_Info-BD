var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('BD_SCA.db');

db.serialize(function() {
// CREATE TABLES
    db.run(`CREATE TABLE IF NOT EXISTS TB_ALUNO (
                id INTEGER,
                nome TEXT NOT NULL,
                cpf TEXT UNIQUE,
                PRIMARY KEY ("id" AUTOINCREMENT)
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS TB_DISCIPLINA (
                id INTEGER,
                nome TEXT NOT NULL,
                PRIMARY KEY ("id" AUTOINCREMENT)
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS TB_PROFESSOR (
                id INTEGER,
                nome TEXT NOT NULL,
                PRIMARY KEY ("id" AUTOINCREMENT)
            )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS TB_PROFESSOR_DISCIPLINA (
                id INTEGER,
                disciplina_id INTEGER NOT NULL, 
                professor_id INTEGER NOT NULL,
                PRIMARY KEY ("id" AUTOINCREMENT),
                FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
                FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS TB_MATRICULA (
                id INTEGER,
                aluno_id INTEGER,
                disciplina_id INTEGER,
                professor_id INTEGER,
                PRIMARY KEY ("id" AUTOINCREMENT),
                FOREIGN KEY ("aluno_id") REFERENCES "TB_ALUNO"("id"),
                FOREIGN KEY ("disciplina_id") REFERENCES "TB_DISCIPLINA"("id"),
                FOREIGN KEY ("professor_id") REFERENCES "TB_PROFESSOR"("id")
            )`);
/*
    // INSERTS
    db.run(`INSERT INTO TB_ALUNO (nome, cpf)
            VALUES  (" Daniel Anastácio", "231.433.432-65"),
                    ("  Luiz Henrique  ", "538.983.173-65"),
                    ("  Nicolas Aguiar ", "345.345.345-65"),
                    ("   Pedro Kauan   ", "654.677.755-32"),
                    ("   João Gabriel  ", "345.567.324-54"),
                    ("Amanda Cavalcante", "546.324.678-34"),
                    (" Caio Cajazeiras ", "456.876.345-12"),
                    ("Antônio Silvestre", "324.765.324-45"),
                    ("  Maria Vitória  ", "234.564.754-32"),
                    ("  Letícia Dutra  ", "234.546.456-87")
            `);

    db.run(`INSERT INTO TB_DISCIPLINA (nome)
            VALUES  ("         Banco de Dados        "),
                    ("Programação Orientada a Objetos"),
                    ("   Fundamentos da Programação  ")
            `);

    db.run(`INSERT INTO TB_PROFESSOR (nome)
            VALUES  (" Ricardo Taveira"),
                    (" Carlos Maurício"),
                    ("   Cesar Olavo  ")
            `);

    db.run(`INSERT INTO TB_PROFESSOR_DISCIPLINA (disciplina_id, professor_id)
            VALUES  (1, 1),
                    (2, 2),
                    (3, 3)
            `);

    db.run(`INSERT INTO TB_MATRICULA (aluno_id, disciplina_id, professor_id)
            VALUES  ( 1, 3, 3),
                    ( 2, 2, 2),
                    ( 3, 1, 1),
                    ( 4, 3, 3),
                    ( 5, 2, 2),
                    ( 6, 1, 1),
                    ( 7, 3, 3),
                    ( 8, 2, 2),
                    ( 9, 1, 1),
                    (10, 2, 2)
            `);
*/
    
//Select

    db.each('SELECT TB_MATRICULA.id AS matricula_id, TB_ALUNO.nome AS aluno_nome, TB_ALUNO.cpf AS aluno_cpf, TB_PROFESSOR.nome AS professor_nome, TB_DISCIPLINA.nome AS disciplina_nome FROM TB_ALUNO, TB_PROFESSOR, TB_DISCIPLINA INNER JOIN TB_MATRICULA ON TB_ALUNO.id = TB_MATRICULA.aluno_id AND TB_PROFESSOR.id = TB_MATRICULA.professor_id AND TB_DISCIPLINA.id = TB_MATRICULA.disciplina_id', function(err, row) {
        console.log(row.matricula_id +" | "+ row.aluno_nome +" | "+ row.aluno_cpf +" | "+ row.disciplina_nome +" | "+ row.professor_nome +" | ");
    })

});

db.close();