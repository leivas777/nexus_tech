import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <>
      <div class={styles.container}>
        <h1>Política de Privacidade</h1>
        <p>
          <strong>Última atualização:</strong> 30 de outubro de 2025
        </p>

        <p>
          Esta Política de Privacidade descreve como as informações são
          coletadas, usadas e compartilhadas quando você interage com nosso
          serviço de automação de mensagens no Instagram, desenvolvido para
          responder às suas dúvidas e solicitações de forma automática.
        </p>

        <h2>1. Quais dados coletamos?</h2>
        <p>
          Nosso aplicativo foi projetado para ser minimalista na coleta de
          dados. Para fornecer uma resposta automática e contextual, coletamos
          as seguintes informações diretamente da API do Instagram:
        </p>
        <ul>
          <li>
            <strong>ID de Usuário do Instagram (ASID):</strong> Um identificador
            numérico único associado à sua conta do Instagram na nossa página.
          </li>
          <li>
            <strong>Nome de Usuário:</strong> Seu nome de usuário público
            (@usuario) para personalização da comunicação.
          </li>
          <li>
            <strong>Conteúdo da Mensagem:</strong> O texto, imagens ou reações
            que você nos envia via Direct Message.
          </li>
          <li>
            <strong>Timestamp da Mensagem:</strong> A data e hora em que a
            mensagem foi enviada, para manter a ordem cronológica da conversa.
          </li>
        </ul>
        <p>
          <strong>Importante:</strong> Nós <strong>NÃO</strong> coletamos,
          armazenamos ou solicitamos informações pessoais sensíveis como e-mail,
          número de telefone, endereço, senhas ou dados financeiros através
          desta automação. Qualquer dado dessa natureza só será conhecido se for
          voluntariamente fornecido por você no corpo da mensagem.
        </p>

        <h2>2. Como usamos os dados?</h2>
        <p>
          Os dados coletados são usados exclusivamente para os seguintes
          propósitos:
        </p>
        <ul>
          <li>
            <strong>Processar e Responder:</strong> Analisar o conteúdo da sua
            mensagem para identificar a intenção e formular uma resposta
            automática relevante.
          </li>
          <li>
            <strong>Manter o Contexto:</strong> Lembrar de interações recentes
            na mesma conversa para fornecer um atendimento contínuo e coerente.
          </li>
          <li>
            <strong>Operação e Melhoria:</strong> Monitorar o funcionamento da
            automação para corrigir falhas e melhorar a qualidade das respostas
            (análise não individualizada).
          </li>
        </ul>
        <p>
          Seus dados <strong>NÃO</strong> são vendidos, alugados ou
          compartilhados com terceiros para fins de marketing ou qualquer outro
          propósito não descrito nesta política.
        </p>

        <h2>3. Armazenamento e Segurança dos Dados</h2>
        <p>
          As informações da conversa são processadas e temporariamente
          armazenadas em um servidor seguro onde nossa aplicação (construída com
          N8N) está hospedada. Implementamos medidas de segurança técnicas e
          administrativas para proteger seus dados contra acesso não autorizado,
          alteração ou destruição.
        </p>
        <p>
          Os dados são retidos apenas pelo tempo necessário para cumprir os
          propósitos descritos nesta política ou conforme exigido por obrigações
          legais.
        </p>

        <h2>4. Seus Direitos</h2>
        <p>
          Como usuário, você tem o direito de solicitar o acesso, a correção ou
          a exclusão dos dados da sua conversa. Para exercer esses direitos, por
          favor, entre em contato conosco através de um dos canais listados
          abaixo.
        </p>

        <h2>5. Contato</h2>
        <p>
          Se você tiver qualquer dúvida sobre esta Política de Privacidade ou
          sobre como seus dados são tratados, entre em contato conosco pelo
          e-mail: <strong>nexus_tech@leivaseleivas.com</strong>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
