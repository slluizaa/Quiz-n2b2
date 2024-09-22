import * as SQLite from 'expo-sqlite/next';

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

// Função para criar as tabelas de temas, perguntas e alternativas
export async function createTable() {
    const queryTemas = `
      CREATE TABLE IF NOT EXISTS tbTemas (
        id_tema TEXT PRIMARY KEY NOT NULL,
        tema TEXT NOT NULL
      )
    `;

    const queryPerguntas = `
      CREATE TABLE IF NOT EXISTS tbPerguntas (
        id_pergunta TEXT PRIMARY KEY NOT NULL,
        id_tema TEXT NOT NULL,
        pergunta TEXT NOT NULL,
        FOREIGN KEY (id_tema) REFERENCES tbTemas (id_tema) ON DELETE CASCADE
      )
    `;

    const queryAlternativas = `
      CREATE TABLE IF NOT EXISTS tbAlternativas (
        id_alternativa TEXT PRIMARY KEY NOT NULL,
        id_pergunta TEXT NOT NULL,
        alternativa TEXT NOT NULL,
        resposta TEXT NOT NULL,
        FOREIGN KEY (id_pergunta) REFERENCES tbPerguntas (id_pergunta) ON DELETE CASCADE
      )
    `;

    let cx;
    try {
        cx = await getDbConnection();

        // Criar as tabelas na ordem correta

        await cx.execAsync(queryTemas); // Executa a criação da tabela de temas
        await cx.execAsync(queryPerguntas); // Executa a criação da tabela de perguntas
        await cx.execAsync(queryAlternativas); // Executa a criação da tabela de alternativas

        console.log("Tabelas criadas com sucesso!");
    } catch (e) {
        console.error('Erro ao criar as tabelas:', e.message);
        throw new Error('Erro ao criar as tabelas: ' + e.message);
    } finally {
        if (cx) {
            // Fechar a conexão ao final, após todas as operações estarem concluídas
            await cx.closeAsync();
        }
    }
}


export async function adicionaPergunta(pergunta) {
    const cx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbPerguntas (id_pergunta, id_tema, pergunta) VALUES (?, ?, ?)';
        const resultado = await cx.runAsync(query, [pergunta.id_pergunta, pergunta.id_tema, pergunta.pergunta]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao adicionar a pergunta: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function adicionaAlternativa(alternativa) {
    const cx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbAlternativas (id_alternativa, id_pergunta, alternativa, resposta) VALUES (?, ?, ?, ?)';
        const resultado = await cx.runAsync(query, [alternativa.id_alternativa, alternativa.id_pergunta, alternativa.alternativa, alternativa.resposta]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao adicionar a alternativa: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function obtemPerguntasPorTema(id_tema) {
    const cx = await getDbConnection();
    try {
        const perguntas = await cx.getAllAsync('SELECT * FROM tbPerguntas WHERE id_tema = ?', [id_tema]);
        const perguntasComAlternativas = [];

        for (const pergunta of perguntas) {
            const alternativas = await cx.getAllAsync('SELECT * FROM tbAlternativas WHERE id_pergunta = ?', [pergunta.id_pergunta]);
            perguntasComAlternativas.push({
                ...pergunta,
                alternativas,
            });
        }

        return perguntasComAlternativas;
    } catch (e) {
        throw new Error('Erro ao obter perguntas: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function obtemTodasPerguntas() {
    const cx = await getDbConnection();
    try {
        const perguntas = await cx.getAllAsync('SELECT * FROM tbPerguntas');
        return perguntas.map((pergunta) => ({
            id_pergunta:pergunta.id_pergunta,
            pergunta:pergunta.pergunta
        }));
    } catch (e) {
        throw new Error('Erro ao obter perguntas: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}


export async function excluiPergunta(id_pergunta) {
    const cx = await getDbConnection();
    try {
        const query = 'DELETE FROM tbPerguntas WHERE id_pergunta = ?';
        const resultado = await cx.runAsync(query, [id_pergunta]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao excluir a pergunta: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function excluiAlternativa(id_alternativa) {
    const cx = await getDbConnection();
    try {
        const query = 'DELETE FROM tbAlternativas WHERE id_alternativa = ?';
        const resultado = await cx.runAsync(query, [id_alternativa]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao excluir a alternativa: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function obtemTodosTemas() {
    const cx = await getDbConnection();
    try {
        const registros = await cx.getAllAsync('SELECT * FROM tbTemas');
        return registros.map((registro) => ({
            id_tema: registro.id_tema,
            tema: registro.tema,
        }));
    } catch (e) {
        console.error("Erro ao obter temas: ", e.message);
        throw new Error('Erro ao obter temas: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}


export async function adicionaTema(tema) {
    const cx = await getDbConnection();
    try {
        const query = 'INSERT INTO tbTemas (id_tema, tema) VALUES (?, ?)';
        const resultado = await cx.runAsync(query, [tema.id_tema, tema.tema]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao adicionar o tema: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function editaTema(tema) {
    const cx = await getDbConnection();
    try {
        const query = 'UPDATE tbTemas SET tema = ? WHERE id_tema = ?';
        const resultado = await cx.runAsync(query, [tema.tema, tema.id_tema]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao editar o tema: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}


export async function temaExiste(tema) {
    const cx = await getDbConnection();
    const resultado = await cx.getAllAsync('SELECT * FROM tbTemas WHERE LOWER(tema) = ?', [tema]);
    await cx.closeAsync();
    return resultado.length > 0; // Se houver algum resultado, o tema já existe
}

export async function excluiTema(id_tema) {
    const cx = await getDbConnection();
    try {
        const query = 'DELETE FROM tbTemas WHERE id_tema = ?';
        const resultado = await cx.runAsync(query, [id_tema]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao excluir o tema: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}

export async function contaPerguntas(id_tema) {
    const cx = await getDbConnection();
    try {
        const query = 'SELECT COUNT(*) FROM tbPerguntas WHERE id_tema = ? group by id_tema';
        const resultado = await cx.runAsync(query, [id_tema]);
        return resultado.changes === 1;
    } catch (e) {
        throw new Error('Erro ao contar a quantidade de perguntas: ' + e.message);
    } finally {
        await cx.closeAsync();
    }
}