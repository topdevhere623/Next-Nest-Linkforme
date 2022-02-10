import { ReactNode, MouseEvent } from 'react';
import { usePlatform } from 'src/client/hooks';
import { Field } from 'src/server/users/interfaces/user.interface';
import { isValidHttpUrl } from 'src/shared/utils/fetch';

interface IProps {
  children: ReactNode;
  data: Field;
  precall?: (e: MouseEvent)=>boolean;
}

export default function Link({ children, data, precall }: IProps) {
  var link = data.link;
  if (data._id) {
    link = '/link/' + data._id;
  }

  const platform = usePlatform(),
    openNewtab = (link: string) => {
      var element: any = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'a',
      );
      element.href = link;
      element.target = '_blank';
      var event = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true,
      });
      element.dispatchEvent(event);
    },
    clickHundler = (e: any) => {
      if (!link) return;

      if(precall && precall(e)){
        return;
      }

      if (data._id) {
        link = document.location.origin + link;
      }

      const preventDefault = () => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
      };

      if (platform === 'ios') {
        preventDefault();
        openNewtab(
          `ftp://${document.location.hostname}/${encodeURIComponent(link)}`,
        );
      }

      if (platform === 'android') {
        preventDefault();
        let formatedLink = link.replace(/(https|http)\:\/\//g, '');
        // document.location.href=
        openNewtab(
          `intent://${formatedLink}#Intent;scheme=https;package=com.android.chrome;end`,
        );
      }
    };

  if(!isValidHttpUrl(data.link) && /socialIcon/g.test(data.type)){
    return null;
  }
  return (
    <a
      href={link}
      onClick={(e) => clickHundler(e)}
      target="_blank"
      style={{ textDecoration: 'none' }}
    >
      {children}
    </a>
  );
}
