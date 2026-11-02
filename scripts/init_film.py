"""Copy the self-contained HTML film starter into a new project directory."""
import argparse
import json
import shutil
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('--brand', '--subject', dest='brand', default='Your product')
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1] / 'assets' / 'film-starter'
    destination = args.output.resolve()
    if destination.exists():
        parser.error(f'Output already exists: {destination}. Choose a new directory.')
    shutil.copytree(source, destination)
    config_path = destination / 'config.js'
    raw = config_path.read_text(encoding='utf-8')
    config = json.loads(raw.split('=', 1)[1].strip().removesuffix(';'))
    config['brand'] = args.brand
    config_path.write_text('window.FILM_CONFIG = ' + json.dumps(config, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print(f'Created: {destination}')
    print(f'Run: cd "{destination}"')
    print('     node serve.cjs')
    print('Open http://localhost:4178/; replace the illustrative content before delivery.')


if __name__ == '__main__':
    main()
