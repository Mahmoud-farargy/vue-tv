<template>
  <div id="about--container" className="no--bannaer--page flex-column">
    <div className="about--inner">
      <div className="about-sub flex-column">
        <div className="flex-column about-section-inner">
          <h2>
            Hi, I'm Mahmoud <br />
            Farargy
          </h2>
          <p>
            A front end developer who is specialized in Vue.js, React.js,
            Javascript and other technologies. You can visit my portfolio to
            find more cool projects like this one
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mahmoud-farargy.web.app"
              >Portfolio.</a
            >
          </p>
          <ul
            className="flex-row socials--links"
            v-if="contactList && contactList.length"
          >
            <li
              v-for="(contactItem, idx) in contactList"
              :title="contactItem.title"
              :key="contactItem.id || idx"
            >
              <a
                :href="contactItem.url"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg-icon
                  type="mdi"
                  :path="contactItem.icon"
                  :size="33"
                ></svg-icon>
              </a>
            </li>
          </ul>
          <div tabIndex="-1" className="github--repo--info flex-row">
            <a href="https://github.com/Mahmoud-farargy/vue-tv" rel="noopener noreferrer" target="_blank">
              <p>Give me a star on Github</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiGithub, mdiGmail, mdiInstagram, mdiCodepen } from "@mdi/js";
export default {
  data() {
    return {
      contactList: [
        {
          type: "github",
          title: "Github",
          url: "https://github.com/Mahmoud-farargy",
          icon: mdiGithub,
          id: "github",
        },
        {
          type: "gmail",
          title: "Email",
          url: "mailto:mahmoudfarargy9@gmail.com",
          icon: mdiGmail,
          id: "gmail",
        },
        {
          type: "instagram",
          title: "Instagram",
          url: "https://www.instagram.com/codepugilist",
          icon: mdiInstagram,
          id: "instagram",
        },
        {
          type: "codepen",
          title: "Code Pen",
          url: "https://codepen.io/mahmoud-farargy/pens/public",
          icon: mdiCodepen,
          id: "codepen",
        },
      ],
    };
  },
  setup() {
    return {
      mdiGithub,
      mdiCodepen,
      mdiGmail,
      mdiInstagram,
    };
  },
};
</script>
<style lang="scss" scoped>
#about--container {
  padding: 20px;
  align-items: center;
  justify-content: center;
  .about--inner {
    .about-sub {
      width: 100%;
      padding:0;
      justify-content: center;
      align-items: center;
    }
    .about-section-inner {
      text-align: justify;
      width: 55%;
      @media only screen and (max-width: 670px) {
        width: 100%;
      }
      h2 {
        text-align: center;
        color: var(--font-black);
        font-weight: bolder;
        letter-spacing: 3px;
      }
      p {
        color: var(--second--gray);
        margin-top: 15px;
        line-height: 1.5;
        a {
          text-decoration: none;
        }
      }

      .my-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
        text-align: center;
        margin: 15px auto;
        box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.2);
      }
      .github--repo--info {
        text-align: center;
        justify-content: center;
        p {
          margin-bottom: 0.7rem;
        }
        a {
          text-decoration: none;
          strong,
          em {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          strong {
            color: var(--font-black);
            transition: color 0.2s linear;
            &:hover {
              color: var(--bluish-sky);
            }
            justify-content: center;
            gap: 0.4rem 0.6rem;
            font-weight: 400;
            span {
              margin-left: 0.2rem;
            }
            svg {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    .socials--links {
      padding: 0;
      margin: 10px 0 0;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      list-style: none;
      li {
        a {
          padding: 13px;
          text-align: center;
          svg {
            color: var(--light-black);
            transition: all 0.3s linear;
            &:hover {
              color: var(--primary-clr);
              transform: translateY(-3px);
            }
          }
        }
      }
    }
  }
}
</style>