
var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);


describe('Functional Tests', function() {

  var id1; // first thread -> delete -> first reply -> delete
  var id2; // second thread
  var id3; // second reply
  
  describe('API ROUTING FOR /api/threads/:board', function() {
    
    describe('POST', function() {
      
      it('New thread', function(done) {
        chai.request(server)
          .post('/api/threads/:board')
          .send({
            board: 'general',
            text: 'Test',
            delete_password: 'pass'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
      it('New thread', function(done) {
        chai.request(server)
          .post('/api/threads/:board')
          .send({
            board: 'general',
            text: 'Test',
            delete_password: 'pass'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
      
    });
    
    describe('GET', function() {
      
      it('Get thread', function(done) {
        chai.request(server)
          .get('/api/threads/general')
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body[0].board, 'general')
            assert.property(res.body[0], 'board');
            assert.property(res.body[0], 'text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'bumped_on');
            assert.property(res.body[0], 'replies');
            assert.notProperty(res.body[0], 'reported');
            assert.notProperty(res.body[0], 'delete_password');
            assert.isArray(res.body, 'thread is an array');
            assert.isArray(res.body[0].replies, 'Replies is an array');
            assert.isBelow(res.body[0].replies.length, 4);
            id1 = res.body[0]._id;
            id2 = res.body[1]._id;
            done();
          });
      });
      
    });

    describe('DELETE', function() {
      
      it('Delete thread', function(done) {
        chai.request(server)
          .delete('/api/threads/:board')
          .send({
            board: 'general',
            thread_id: id1,
            delete_password: 'pass'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, 'success')
            done();
          });
      });
      
    });
    
    describe('PUT', function() {
      
      it('Report thread', function(done) {
        chai.request(server)
          .put('/api/threads/:board')
          .send({
            board: 'general',
            thread_id: id2
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, 'success');
            done();
          });
      });
      
    });
    

  });

  describe('API ROUTING FOR /api/replies/:board', function() {
    
    describe('POST', function() {
      
      it('New reply', function(done) {
        chai.request(server)
          .post('/api/replies/:board')
          .send({
            board: 'general',
            thread_id: id2,
            text: 'Test',
            delete_password: 'pass'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
      it('New reply', function(done) {
        chai.request(server)
          .post('/api/replies/:board')
          .send({
            board: 'general',
            thread_id: id2,
            text: 'Test',
            delete_password: 'pass'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            done();
          });
      });
      
    });
    
    describe('GET', function() {
      
      it('Get thread with replies', function(done) {
        chai.request(server)
          .get('/api/replies/general')
          .query({thread_id: id2})
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.property(res.body, 'text');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'bumped_on');
            assert.property(res.body, 'replies');
            assert.notProperty(res.body, 'reported');
            assert.notProperty(res.body, 'delete_password');
            assert.isArray(res.body.replies, 'Replies is an array');
            assert.isBelow(res.body.replies.length, 4);
            id1 = res.body.replies[0]._id;
            id3 = res.body.replies[1]._id;
            done();
          });
      });
      
    });

    describe('DELETE', function() {
      
      it('Delete reply', function(done) {
        chai.request(server)
          .delete('/api/replies/:board')
          .send({
            board: 'general',
            thread_id: id2,
            delete_password: 'pass',
            reply_id: id1
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, 'success')
            done();
          });
      });
      
    });

    describe('PUT', function() {
      
      it('Report reply', function(done) {
        chai.request(server)
          .put('/api/replies/:board')
          .send({
            board: 'general',
            thread_id: id2,
            reply_id: id3
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body, 'success');
            done();
          }); 
      });
      
    })
    
  });

});
