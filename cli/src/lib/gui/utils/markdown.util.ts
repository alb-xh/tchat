import * as marked from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({ renderer: new TerminalRenderer() as never });

export const markdown = marked.parse as (str: string) => string;