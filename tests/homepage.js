import {Selector} from 'testcafe';

let mlb_preseason = true;
fixture('FP Mainsite')
    .page('https://www.fantasypros.com/index.php');

test('Homepage', async t => {
    await t
        .expect(Selector('#nav-top > nav > div.top-link.sport-link.top-sport-nfl.mega-dropdown-wrap > a').innerText).eql('NFL', 'NFL Link missing in navbar')
        .expect(Selector('.ad-320+ nav .heading a').textContent).eql('Draft Wizard', 'Unexpected First Header');
    if (mlb_preseason) {
        await t
            .expect(Selector('.promo-text .visible-desktop').exists).ok('Promo Text Missing')
    }
});
