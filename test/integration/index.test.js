const  { cli } = require('httpyac'),
path = require('path'),
mockServer = require("mockttp").getLocal();

describe('httpyac-plugin-meta-exports', () => {
  beforeEach(() => mockServer.start(8080));
  afterEach(() => mockServer.stop());
  jest.spyOn(process, 'exit').mockImplementation();
  jest.spyOn(console, 'info').mockImplementation();

  it('call request with exported variable', async () => {
    const endpointMock = await mockServer.get("/1").thenReply(200, "{\"id\":1}", {"Content-Type": "application/json"});

    await cli.execute([
      '',
      '',
      path.join(__dirname, '/test.http'),
      '-n', 'getId'
    ]);

    const requests = await endpointMock.getSeenRequests();
    expect(requests.length).toEqual(2);
  });
});