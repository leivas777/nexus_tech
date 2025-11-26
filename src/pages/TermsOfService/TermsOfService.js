import styles from "./TermsOfService.module.css";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Termos de Serviço App Nexus Tech</h1>
        <p>
          <strong>Última Atualização:</strong> 24 de Novembro de 2025
        </p>

        <p>Bem-vindo ao Nexus Tech!</p>

        <p>
          Por favor, leia estes Termos de Serviço ("Termos") cuidadosamente
          antes de usar nosso serviço de automação de respostas para Instagram
          ("Serviço"), operado por Leivas & Leivas Ltda.
        </p>
        <p>
          Ao acessar ou usar o Serviço, você concorda em se vincular a estes
          Termos. Se você não concordar com qualquer parte dos termos, não
          poderá acessar o Serviço.
        </p>

        <h2>1. Descrição do Serviço</h2>
        <p>
          O Nexus Tech é uma ferramenta de software que se conecta à sua conta
          do Instagram e WhatsApp, através da API oficial, para automatizar o
          envio de respostas a mensagens diretas (Direct Messages) com base em
          gatilhos e fluxos pré-configurados por você. Nosso serviço funciona
          como um intermediário para executar as automações que você define.
        </p>

        <h2>2. Contas e Responsabilidades do Usuário</h2>
        <ul>
          <li>
            <strong>Configuração da Conta:</strong>Para usar o Serviço, você
            precisará nos fornecer as permissões de acesso necessárias à sua
            conta do Instagram e/ou WhatsApp Business. Você é responsável por
            manter a segurança de suas credenciais e por todas as atividades que
            ocorrem em sua conta.
          </li>
          <li>
            <strong>Conteúdo das Mensagens:</strong>ocê é o único responsável
            pelo conteúdo das mensagens automáticas enviadas através do nosso
            Serviço. Você concorda em não utilizar o Serviço para enviar spam,
            conteúdo ilegal, ofensivo, enganoso ou que viole os direitos de
            terceiros.
          </li>
          <li>
            <strong>Conformidade com o Instagram:</strong>
            Você concorda em cumprir integralmente os [Termos de Uso do
            Instagram](https://help.instagram.com/581066165581870) e suas
            [Políticas da
            Plataforma](https://developers.facebook.com/docs/instagram/policy/).
            A violação das políticas do Instagram pode resultar na suspensão ou
            encerramento da sua conta do Instagram, pela qual não nos
            responsabilizamos.
          </li>
        </ul>

        <h2> 3. Uso Aceitável e Limitações</h2>
        <ul>
          <li>
            O Serviço deve ser usado para fins legítimos de comunicação e
            engajamento.
          </li>
          <li>
            {" "}
            É proibido o uso do Serviço para atividades de assédio, envio de
            mensagens em massa não solicitadas (spam) ou qualquer outra prática
            que degrade a experiência de outros usuários no Instagram e/ou
            WhatsApp Business.
          </li>
          <li>
            O funcionamento do nosso Serviço depende da disponibilidade e do bom
            funcionamento das APIs do Instagram/Facebook e da plataforma N8N.
            Não nos responsabilizamos por interrupções, falhas ou alterações
            nessas plataformas de terceiros que possam impactar nosso Serviço.
          </li>
        </ul>

        <h2>4. Privacidade e Dados</h2>
        <p>
          Nossa coleta e uso de informações pessoais em conexão com o seu acesso
          e uso do Serviço estão descritos em nossa{" "}
          <strong>[Política de Privacidade]</strong>, que pode ser acessada em:{" "}
          <Link to="/privacy-policy">
            https://www.nexustech.tec.br/privacy-policy
          </Link>
          Ao utilizar nosso serviço, você reconhece e concorda com as práticas
          de dados descritas em nossa Política de Privacidade.
        </p>

        <h2>5. Propriedade Intelectual</h2>
        <p>
          O Serviço e seu conteúdo original, recursos e funcionalidades são e
          permanecerão como propriedade exclusiva de Leivas e Leivas Ltda. O
          conteúdo, dados e mensagens gerados por você através da sua conta do
          Instagram permanecem de sua propriedade.
        </p>

        <h2>6. Isenção de Garantias e Limitação de Responsabilidade</h2>
        <p>
          O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL". Não
          garantimos que o serviço será ininterrupto, seguro ou livre de erros.
          Em nenhuma circunstância a Leivas& Leivas Ltda será responsável por
          quaisquer danos diretos ou indiretos (incluindo, mas не limitado a,
          perda de lucros, dados, ou interrupção de negócios) decorrentes do uso
          ou da incapacidade de usar o Serviço, ou como resultado de ações
          tomadas pelo Instagram/Facebook em relação à sua conta (como
          suspensões ou banimentos).
        </p>

        <h2>7. Rescisão</h2>
        <p>
          Podemos rescindir ou suspender seu acesso ao nosso Serviço
          imediatamente, sem aviso prévio ou responsabilidade, por qualquer
          motivo, incluindo, sem limitação, se você violar os Termos. Você pode
          deixar de usar o serviço a qualquer momento, revogando as permissões
          de acesso em sua conta do Instagram e/ou WhatsApp Business.
        </p>

        <h2>8. Modificações nos Termos</h2>
        <p>
          Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou
          substituir estes Termos a qualquer momento. Se uma revisão for
          material, tentaremos fornecer um aviso com pelo menos 30 dias de
          antecedência antes que quaisquer novos termos entrem em vigor. O que
          constitui uma alteração material será determinado a nosso exclusivo
          critério.
        </p>

        <h2>9. Lei Aplicável</h2>
        <p>
          Estes Termos serão regidos e interpretados de acordo com as leis do
          Brasil, sem levar em conta o conflito de disposições legais.
        </p>

        <h2>10. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre estes Termos, entre em contato
          conosco em:
          <strong> E-mail:</strong> nexus_tech@leivaseleivas.com.
        </p>
      </div>
    </>
  );
};

export default TermsOfService;
